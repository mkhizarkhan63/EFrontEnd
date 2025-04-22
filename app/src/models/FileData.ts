import { flow, toGenerator, types, type Instance } from 'mobx-state-tree';
import { E, Img, MstType, restQuery } from '~/api';
import { stores } from '~/stores';
import { loadImageFromFile } from '~/utils';

export type FileDataType = Instance<typeof FileDataBase>;

export const FileDataBase = types
    .model({
        id: stores.idCollection.getIdentifier('file'),
        fileId: MstType.string,
        name: MstType.string,
        img: MstType.Img,
        isNameLoaded: false,
    })
    .volatile(() => ({
        file: undefined as File | undefined,
    }))
    .views(self => ({
        get hasImg() {
            return Boolean(self.img) && self.img?.url !== '';
        },

        get isExternal() {
            return stores.idCollection.isExternal('file', self.id);
        },

        get fileType() {
            const images = ['png', 'jpeg', 'jpg', 'svg', 'gif'];

            const fileFormat = self.name.split('.').pop()?.toLowerCase();

            if (!fileFormat) {
                return 'file';
            }

            return images.includes(fileFormat) ? 'image' : 'file';
        },
    }))
    .actions(self => ({
        load: flow(function*() {
            const loadedFile = yield* toGenerator(restQuery.file.get(self.fileId, self.name));

            if (loadedFile) {
                self.file = loadedFile;
                self.name = loadedFile.name;
                self.isNameLoaded = true;
            }
        }),

        loadFileName: flow(function*() {
            const filePreview = yield* toGenerator(restQuery.file.getPreview(self.fileId));

            if (filePreview) {
                self.name = filePreview.fileName ?? '';
                self.isNameLoaded = true;
            }
        }),

        loadImgFromId: (id?: string, size?: E.MinifiedImageSize) => {
            if (!id) {
                return;
            }

            self.img = Img.create(id, () => size ?? E.MinifiedImageSize.none);
        },

        connect: (externalId?: number) => {
            stores.idCollection.connect('file', self.id, externalId ?? self.id);
        },

        setFile: (file?: File) => {
            self.file = file;
            self.name = file?.name ?? '';
        },

        setFileId: (fileId: string) => {
            self.fileId = fileId;
        },

        setName: (name: string) => {
            self.name = name;
            self.isNameLoaded = true;
        },

        removeFile: () => {
            self.file = undefined;
            self.img = undefined;
            stores.idCollection.disconnect('file', self.id);
        },
    })).actions(self => ({
        loadImg: (imgFile?: File) => {
            const file = imgFile ?? self.file;

            if (self.fileType === 'file') {
                self.img = new Img('/assets/graphics/document.svg');
                return;
            }

            if (file) {
                self.img = loadImageFromFile(file);
                return;
            }

            self.loadImgFromId(self.fileId);
        },
    }));

const methods = {
    tryFromExternal: async (fileId?: string) => {
        if (!fileId) {
            return;
        }

        return await methods.fromExternal(fileId);
    },
    fromExternal: async (fileId: string) => {
        const file = FileData.create({ fileId });
        file.connect();

        await file.loadFileName();

        return file;
    },
};

export const FileData = Object.assign(
    FileDataBase,
    methods,
);
