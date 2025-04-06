const cloud_name = "djjm233nn";
const upload_preset = "eni7e5ph";

export const uploadCloudinary = async (pics, fileType) => {
    if (pics && fileType) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
            method: "POST",
            body: data
        });

        const filedata = await res.json();
        return filedata.url;
    } else {
        throw new Error("Invalid input: pics and fileType are required.");
    }
};
