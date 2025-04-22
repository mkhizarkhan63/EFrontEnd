# Ebinaa

## Rules

1. First of all use NPM (**yarn is banned**) to install package in `~/app` directory.
2. All dependencies have to be added using **static** (e.g `1.0.2`) version, not any kind of range (e.g `^1.0.2`).
3. Easy things have to be done using raw code - **not** bloatware dependency.
4. Code with lint errors will cause critical errors at CI/CD.

## Directories structure

- `~/app/`
  - `build/` - built application
  - `shims/` - shims used to make code easier to read
  - `src/`
    - `bits/` - small components
    - `models/` - data units as classes
    - `partials/` - partial views working out of render context
    - `stores/` - singleton data storages, e.g long-living collections
    - `utils/` - toolbelt of functions to transform data or constants
    - `views/` - contextful representable compontents, entrypoints etc.
    - `api/` - contextful toolbelt to provied some superpowers into code
  - `make.ts` - building and developing tasks

### Shims

Shims allows prepend some code used in many places. All of shims have to provide two files:

- `ShimName.ts(x)` - with shim content, they are used at building process
- `ShimName.d.ts` - with shim declarations, they are used at type checking process

### Models

Model is a way to represent data as unit. Models have following rules:

- Model have to be a class
- Model have to be stored in one of stores
- Model can represent any kind of data
- Model can contains ViewModel to self-represent in UI
- All models have to be in directory of the same name
- ViewModel have to be named like Model but with `.vm` suffix, e.g: `Product.ts` and `Product.vm.ts`
- ViewModel have to be not exported out of directory
- ViewModel have to be created using `useState`
- ViewModel have to be created in Model's method named `useViewModel`

### Partials

Partials are working parts of Views without static place in code. Each Partial is working Component. E.g navigation bar

### Stores

Stores contains all fetched/calculated data, as raw data or as Models. Each Store have to be singleton that exports instance.

### Utils

Utils have not use context of any kind. They are just functions or data used to prepare something. E.g Colors HEX calculations etc.

### Views

Views represent visible single-place (that have to be used only in one place) elements.

### Bits

Bits are very small components that can do something useful in many places, e.g featuresfull input. They have to be contextless and stateless - state have to be provided from parents.

### API

Api things allow do data-based things like connect with Rest API, provied Debug utilities etc.
