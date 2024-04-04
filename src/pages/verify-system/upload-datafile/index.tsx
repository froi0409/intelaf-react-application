import { ReactNode } from "react";
import { UploadDataFileForm } from "src/components/upload-datafile/UploadDatafile";
import EmployeeLayout from "src/layouts/EmployeeLayout";
import UserLayout from "src/layouts/UserLayout";


const UploadDataFile = () => {

    return (
        <>
            <UploadDataFileForm />
        </>
    );

}


UploadDataFile.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default UploadDataFile;