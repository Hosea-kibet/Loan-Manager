import prisma from "../config/prisma";
import { uploadFileToS3 } from "../utils/s3";

interface UploadDocumentInput {
    loanId?: number;
    userId?: number;
    type: string;
    file: Express.Multer.File;
    status: string;
}

interface AddCollateralInput {
    loanId: number;
    type: string;
    value: number;
    description?: string;
    status: string;
    userId: number;
}

export const uploadDocument = async ({
    loanId,
    userId,
    type,
    file,
    status
}: UploadDocumentInput) => {

    const url = await uploadFileToS3(file.buffer, file.originalname, file.mimetype);

    const document = await prisma.document.create({
        data: {
            loanId,
            userId,
            type,
            url,
            status
        }
    });

    await prisma.auditLog.create({
        data: {
            userId: userId!,
            action: "UPLOAD_DOCUMENT",
            entity: "Document",
            entityId: document.id,
            details: `User uploaded document (${type}) for loan ${loanId}`,
        },
    });

    return document
};


export const addGuarantor = async ({
    loanId,
    name,
    contact,
    relationship,
    userId
}: {
    loanId: number;
    name: string;
    contact: string;
    relationship: string;
    userId?: number;
}

) => {
    const guarantor = await prisma.guarantor.create({
        data: {
            loanId,
            name,
            contact,
            relationship,
            verified: false,
        }
    })

    await prisma.auditLog.create({
        data: {
            userId: userId!,
            action: "ADD_GUARANTOR",
            entity: "Guarantor",
            entityId: guarantor.id,
            details: `Guarantor (${name}) added for loan ${loanId}`,
        },
    })

    return guarantor;
}




export const addCollateral = async ({
    loanId,
    type,
    value,
    description,
    status,
    userId,
}: AddCollateralInput) => {
    const collateral = await prisma.collateral.create({
        data: {
            loanId,
            type,
            value,
            description,
            status,
        },
    });

    await prisma.auditLog.create({
        data: {
            userId,
            action: 'ADD_COLLATERAL',
            entity: 'Collateral',
            entityId: collateral.id,
            details: `Collateral of type '${type}' worth ${value} added to Loan #${loanId}`,
        },
    });

    return collateral;
};

