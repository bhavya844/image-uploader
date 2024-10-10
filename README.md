# Image Uploader Application

This is a React-based image uploader application that allows users to register, log in, and upload images. The application stores the uploaded images in Amazon S3 and retrieves them for viewing. 

## Deployed Application

The application is live and can be accessed at: [Image Uploader](https://bhavyadave-image-uploader.netlify.app/)

## Features

- **User Registration and Login**: Users can register and log in with their email and password.
- **Upload Photos**: Authenticated users can upload photos directly to Amazon S3.
- **View Photos**: Users can view the photos they have uploaded, fetched from the S3 bucket.
- **Responsive Design**: The application is built using Tailwind CSS for a fully responsive and attractive UI.

## Technologies Used

- **React**: Frontend framework.
- **React Router**: For client-side navigation.
- **Tailwind CSS**: For responsive styling and layout.
- **Axios**: For making API requests.
- **Toastify**: For displaying success and error messages.
- **AWS Lambda & API Gateway**: Backend to handle user registration, login, and image uploading.
- **Amazon S3**: Cloud storage for uploaded images.
- **Netlify**: Platform for continuous deployment and hosting.

## Pages and Functionality

### 1. Home Page (Landing Page)
- This is the main landing page where users can choose to:
  - View All Users
  - View All Photos
  - Upload a Photo

### 2. Register Page
- Users can register with their email and password.
- Upon successful registration, they can log in to the application.

### 3. Login Page
- Users can log in using their registered email and password.
- Upon successful login, users are redirected to the main page to access the app's features.

### 4. Upload Photo
- Authenticated users can upload a photo to the S3 bucket.
- The photo is converted to Base64 format and uploaded via the backend API to S3.
  
### 5. View All Photos
- Users can view all their uploaded photos on a separate page.
- The photos are fetched from the S3 bucket and displayed in a responsive grid format.

## How to Run Locally

1. **Clone the repository**:

    ```bash
    git clone https://github.com/bhavya844/image-uploader.git
    cd image-uploader
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the application**:

    ```bash
    npm start
    ```

    The application will start on `http://localhost:3000`.

## Build and Deployment

To create a production build, run:

```bash
npm run build
