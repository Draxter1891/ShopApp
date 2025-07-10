import {
  GoogleSignin,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
// for preventing log warnings
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
import auth from '@react-native-firebase/auth';

export const _signinWithGoogle = async (): Promise<SignInResponse | null> => {
  try {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId:
        '239186259027-f7amln35lbrqjp0521va7je4ak35jmck.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    await GoogleSignin.hasPlayServices();

    const userInfo: SignInResponse = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();

    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredentials);
    return userInfo;
  } catch (error: unknown) {
    console.log(`Google signinError ${error}`);
    return null;
  }
};

export const logout = async () => {
  try {
    // from Firebase (removes authentication token, session,...)
    await auth().signOut();
    //checking for google
    const wasSignedin = GoogleSignin.hasPreviousSignIn();
    if (wasSignedin) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    console.log('signout successfully');
  } catch (error) {
    console.log('error in logout', error);
  }
};
