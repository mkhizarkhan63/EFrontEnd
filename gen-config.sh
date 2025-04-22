#
# Prints all ENV variables which begins with JS_ into JSON-like JS file
# @usage <this_file> > config-file.json
#

# --- config ---

window_key="b1f307cedf6cc0b3ba72f9c4cfbac9ac"

# --- body ---

declare -A $( env | grep '^JS_*' | awk -F'=' '{print "environment["$1"]="$2}' ) > /dev/null

config_file="{"

for i in "${!environment[@]}"
do
    config_file=$config_file"\"${i}\":\"${environment[$i]}\","
done

config_file="${config_file%,}}"

echo -n "window['$window_key']=$config_file;"
