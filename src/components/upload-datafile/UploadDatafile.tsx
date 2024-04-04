import * as React from 'react';
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { uploadDataFile } from 'src/utils/apiUtils/data-file/uploadDataFileUtil';
import { useState } from 'react';
import ErrorsDataFileReport from './ErrorsDataFileReport';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export const UploadDataFileForm = () => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [errorsReportData, setErrorsReportData] = useState([]);
    const [records, setRecords] = useState(0);
    const [data, setData] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await uploadDataFile(formData);
            console.log(res);
            
            setErrorsReportData(res.data.errors);
            setRecords(res.data.records);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);
    }

    return (
        <Grid container spacing={5}>
            <Grid item xs={12}>
            <Card>
                <CardHeader title='Subir Archivo de Datos' titleTypographyProps={{ variant: 'h6' }} />
                <CardContent sx={{ minHeight: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Grid container spacing={5} alignItems="center">
                                    <Grid item xs={2}>
                                        <Button
                                            fullWidth
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Subir Archivo
                                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={9}>
                                        {selectedFile && <p style={{ margin: 0 }}>Selected File: {selectedFile.name}</p>}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant='contained' size='large' fullWidth>
                                    Procesar Archivo
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}  >
                {errorsReportData && errorsReportData.length > 0 && (
                    <Grid>
                        <ErrorsDataFileReport records={records} dataServer={errorsReportData} />
                    </Grid>
                        
                )}
                
            </Grid>
        </Grid>
    );
}
