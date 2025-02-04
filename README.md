# Full Stack React + Flask + MongoDB Application

This project is a simple **React frontend**, **Flask backend**, and **MongoDB database** that registers user emails.  

---

## **📌 Prerequisites**
Ensure you have the following installed on your system:

- [Python 3.x](https://www.python.org/downloads/)
- [Node.js & npm](https://nodejs.org/en/download/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- [Homebrew (for macOS)](https://brew.sh/)

---

## **🚀 Setup Instructions**

### **1️⃣ Start MongoDB**
MongoDB is required for storing email IDs.

#### **Install MongoDB (Only if not installed)**
```sh
brew tap mongodb/brew
brew install mongodb-community
```

#### **Start MongoDB**
```sh
brew services start mongodb-community
```

#### **Verify MongoDB is Running**
```sh
mongosh
```
Inside MongoDB shell:
```js
show dbs;
```

---

### **2️⃣ Setup and Start the Flask Backend**
The backend is built using **Flask** and uses **MongoDB**.

#### **Navigate to the Backend Directory**
```sh
cd backend
```

#### **Create a Virtual Environment (Recommended)**
```sh
python3 -m venv venv
source venv/bin/activate
```

#### **Install Dependencies**
```sh
pip install -r requirements.txt
```

#### **Start the Flask Server**
```sh
python app.py
```
✅ The backend should now be running at **`http://localhost:3001`**

---

### **3️⃣ Setup and Start the React Frontend**
The frontend is built using **React.js** and communicates with the Flask backend.

#### **Navigate to the Frontend Directory**
```sh
cd frontend
```

#### **Install Dependencies**
```sh
npm install
```

#### **Start the React App**
```sh
npm start
```
✅ The frontend should now be running at **`http://localhost:3000`**.

---

## **🌟 How to Use**
1. Open **`http://localhost:3000`** in your browser.
2. Enter an **email address** and click **Submit**.
3. If the email is **not already registered**, it will be added to the database.
4. If the email **already exists**, you will see a message saying so.
5. The app redirects to a **home page** after successful registration.

---

## **🛠 Debugging & Common Issues**
### **Check if MongoDB is Running**
```sh
brew services list
```
If MongoDB is not running:
```sh
brew services start mongodb-community
```

### **Check If Flask Server is Running**
```sh
curl -X OPTIONS http://localhost:3001/health
```

### **Check MongoDB Data**
```sh
mongosh
use email_db
db.emails.find().pretty()
```

---

## **💡 Environment Variables (Optional)**
You can store MongoDB connection details in a **`.env`** file and load them in `app.py`:
```
MONGO_URI=mongodb://localhost:27017/
```
Then update **Flask backend** to read from `.env`:
```python
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
```

---

## **✅ Summary of Commands**
### **Start MongoDB**
```sh
brew services start mongodb-community
```

### **Start Flask Backend**
```sh
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### **Start React Frontend**
```sh
cd frontend
npm install
npm start
```

---

### **🚀 Now You’re Ready! Enjoy Coding! 🎉**

