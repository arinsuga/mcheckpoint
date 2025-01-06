import mime from 'mime';

export const useFileUri = (filePath: string): string => `file://${filePath}`;
export const useFileURL = (filePath: string): URL => {
    const fileUri = useFileUri(filePath);
    const url = new URL(fileUri);

    return url
}
export const useFileName = (filePath: string): string => {
    const fileName: string | undefined = useFileURL(filePath).pathname.split('/').pop();

    if (!fileName) {
        return '';
    }

    return fileName as string;
}
export const fileType = (filePath: string) => mime.getType(filePath);

const Fileuse = {

    uri: useFileUri,
    url: useFileURL,
    name: useFileName,
    type: fileType,

}

export default Fileuse;
