
import { CameraCapturedPicture } from "expo-camera";
import axios from "axios";

import ICheckpoint from "@/interfaces/ICheckpoint";

const checkin = ({ files, checkType, description }: ICheckpoint) => {
    let result = null;
    
    const endpoint = 'https://api.pdfrest.com/upload';
    const fileData = files;

    const jsonData = {
        checkType: checkType,
        description: description,
    }

    const postData = {
        json: jsonData,
        file: fileData,
    }



    return result;
}

export default checkin;
