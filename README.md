# 🛍️ Shop - React Native eCommerce App

> A sleek Android-only shopping experience built with React Native CLI, offering Google Sign-In, real-time product browsing, favorites, cart management, and seamless Razorpay checkout.

---

![React Native](https://img.shields.io/badge/Made%20with-React%20Native-20232A?logo=react\&logoColor=61DAFB) ![Redux Toolkit](https://img.shields.io/badge/State%20Mgmt-Redux%20Toolkit-764ABC?logo=redux\&logoColor=white) ![Firebase](https://img.shields.io/badge/Auth-Firebase-FFA611?logo=firebase\&logoColor=white) ![Razorpay](https://img.shields.io/badge/Payments-Razorpay-00AFEF?logo=razorpay\&logoColor=white) ![Android](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android\&logoColor=white)

## 🔥 Features

* **Google Sign-In** using Firebase Auth
* **Browse Products** fetched from FakeStore API
* **Favorites**: Add/remove products to your wishlist
* **Cart Management**: Add, remove, increase/decrease quantity, clear cart
* **Persistent State** with Redux Persist & AsyncStorage
* **Checkout** via Razorpay integration (test mode)
* **Smooth Navigation**: Stack & Bottom Tab navigators

## 🛠️ Tech Stack & Key Packages

| Package                                                        | Purpose                                |
| -------------------------------------------------------------- | -------------------------------------- |
| `react-native`                                                 | Core framework                         |
| `@react-native-async-storage/async-storage`                    | Persist Redux state locally            |
| `@react-native-firebase/app` & `auth`                          | Firebase setup & Google authentication |
| `@react-native-google-signin/google-signin`                    | Google Sign-In integration             |
| `axios`                                                        | HTTP requests to FakeStore API         |
| `@reduxjs/toolkit` & `react-redux`                             | Simplified Redux state management      |
| `redux-persist`                                                | Persist Redux slices across restarts   |
| `@react-navigation/native`, `stack`, `bottom-tabs`             | App navigation                         |
| `react-native-razorpay`                                        | Razorpay payment gateway               |
| `react-native-vector-icons`                                    | Icons for UI elements                  |
| `react-native-loader-kit`                                      | Loading animations                     |
| `react-native-reanimated` & `carousel`                         | Animated carousel components           |
| `react-native-safe-area-context`, `screens`, `gesture-handler` | Navigation dependencies                |

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/shop.git
   cd shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   npx pod-install      # if building for iOS in future
   ```

3. **Configure Firebase & Razorpay**

   * Create your own Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

     * Enable Google Sign-In in **Authentication > Sign-in method**
     * Copy your **Android** app configuration (`google-services.json`) into `android/app/`

   * Sign up on Razorpay Dashboard: [https://dashboard.razorpay.com/](https://dashboard.razorpay.com/)

     * Copy your **Test** Key ID & Key Secret

4. **Run the app**

   ```bash
   npx react-native run-android
   ```

> **Note**: This project is currently Android-only. iOS support coming soon.

## 🔑 Roadmap: Obtaining API Keys

1. **Firebase**

   * Go to Firebase Console → Add project → Register Android app → Download `google-services.json`
   * Place `google-services.json` in `android/app/`

2. **Razorpay**

   * Sign up / Log in at Razorpay Dashboard
   * Navigate to **Settings > API Keys** → Generate **Test** Key pair
   * Copy **Key ID** & **Key Secret** into your app (you can store them in code or an env)

### Testable APK
📱 **[Download the latest APK from Releases](https://github.com/Draxter1891/ShopApp/releases)**
---
## 📈 Future Roadmap

* 🔹 iOS app support
* 🔹 Product **Search** functionality
* 🔹 Category-wise **Filtering** & Sorting
* 🔹 Order History screen
* 🔹 Push Notifications for offers

## 🤝 Connect with Me

* LinkedIn: [tripathi-rishabh](https://www.linkedin.com/in/tripathi-rishabh)
* Portfolio: [rishabhtripathiportfolio.vercel.app](https://rishabhtripathiportfolio.vercel.app/)

---

*Crafted with ❤️ by Rishabh Tripathi*
