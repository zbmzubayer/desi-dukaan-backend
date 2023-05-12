import { diskStorage } from 'multer';

export const saveUploadedFile = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
      cb(null, fileName);
    },
  }),
  // File Upload Validation
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
// Customer Photo
export const saveCustomerPhoto = {
  storage: diskStorage({
    destination: './uploads/customer-photo',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
      cb(null, fileName);
    },
  }),
  // File Upload Validation
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
// Seller Photo
export const saveSellerPhoto = {
  storage: diskStorage({
    destination: './uploads/seller-photo',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
      cb(null, fileName);
    },
  }),
  // File Upload Validation
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
// Admin Photo
export const saveAdminPhoto = {
  storage: diskStorage({
    destination: './uploads/admin-photo',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
      cb(null, fileName);
    },
  }),
  // File Upload Validation
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
// Product Photo
export const saveProductPhoto = {
  storage: diskStorage({
    destination: './uploads/product-photo',
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e6)}.${ext}`;
      cb(null, fileName);
    },
  }),
  // File Upload Validation
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
