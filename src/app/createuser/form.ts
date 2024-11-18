import model from "./model";

const initialState: model = {
  username: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  state: '',
  city: '',
  country: '',
  pincode: '',
  uploadedFile: null,
  uploadedFiles: [],
  location: { latitude: null, longitude: null },
};

export default initialState;
