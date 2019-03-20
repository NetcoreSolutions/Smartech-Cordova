package com.netcore;

import android.content.Context;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import in.netcore.smartechfcm.NetcoreSDK;

/**
 * This class echoes a string called from JavaScript.
 */
public class Smartech extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            Context context=cordova.getActivity().getApplicationContext();
            if (action.equals("setIdentity")) {
                String identity = args.getString(0);
                this.setIdentity(context,identity, callbackContext);
            } else if (action.equals("clearIdentity")) {
                this.clearIdentity(context, callbackContext);
            }

            else if (action.equals("login")) {
                String identity = args.getString(0);
                this.login(context,identity, callbackContext);
            } else if (action.equals("logout")) {
                this.logout(context, callbackContext);
            }

            else if (action.equals("track")) {
                String eventName = args.getString(0);
                String payload = args.getString(1);
                this.track(context,eventName,payload,callbackContext);
                return true;
            } else if (action.equals("profile")) {
                JSONObject profileData = args.getJSONObject(0);
                this.profile(context,profileData,callbackContext);
            }

            else if (action.equals("optOut")) {
                boolean optOut = args.getBoolean(0);
                this.optOut(context,optOut,callbackContext);
            } else if (action.equals("setUserLocation")) {
                Double latitude = args.getDouble(0);
                Double longitude = args.getDouble(1);
                this.setUserLocation(context,latitude, longitude,callbackContext);
            }

            else if (action.equals("setPushToken")) {
                String token = args.getString(0);
                this.setPushToken(context,token,callbackContext);
                return true;
            } else if (action.equals("getPushToken")) {
                this.getPushToken(context,callbackContext);
            }

            else if (action.equals("getGUID")) {
                this.getGUID(context,callbackContext);
                return true;
            } else if (action.equals("getNotifications")) {
                int notificationCount = args.getInt(0);
                this.getNotifications(context,notificationCount,callbackContext);
            }
            return true;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }

    private void setIdentity(Context context,String identity, CallbackContext callbackContext) {
        try {
            if (identity != null && identity.length() > 0) {
                NetcoreSDK.setIdentity(context, identity);
                callbackContext.success(identity);
            } else {
                callbackContext.error("Expected one non-empty string argument.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void clearIdentity(Context context,CallbackContext callbackContext) {
        try {
            NetcoreSDK.clearIdentity(context);
            callbackContext.success("Identity Cleared!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }

    private void login(Context context, String identity, CallbackContext callbackContext) {
        try {
            NetcoreSDK.setIdentity(context, identity);
            NetcoreSDK.login(context);
            callbackContext.success("Login Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void logout(Context context, CallbackContext callbackContext) {
        try {
            NetcoreSDK.logout(context);
            callbackContext.success("Logout Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }

    private void track(Context context,String eventName, String payload,CallbackContext callbackContext) {
        try {
            JSONObject newPayloadData = new JSONObject();
            newPayloadData.put("payload",new JSONObject(payload));
            NetcoreSDK.track(context,eventName,newPayloadData.toString());
            callbackContext.success("Event tracked!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void profile(Context context, JSONObject profileData, CallbackContext callbackContext) {
        try {
            NetcoreSDK.profile(context, profileData);
            callbackContext.success("Profile Updated!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }

    private void optOut(Context context,boolean optOut,CallbackContext callbackContext) {
        try {
            NetcoreSDK.optOut(context,optOut);
            callbackContext.success("User OPT Out :"+optOut);
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void setUserLocation(Context context,Double latitude, Double longitude, CallbackContext callbackContext) {
        try {
            NetcoreSDK.setUserLocation(context, latitude, longitude);
            callbackContext.success("Location Registered!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }

    private void setPushToken(Context context, String token, CallbackContext callbackContext) {
        try {
            NetcoreSDK.setPushToken(context, token);
            callbackContext.success("Token save Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void getPushToken(Context context, CallbackContext callbackContext) {
        try {
            String token = NetcoreSDK.getPushToken(context);
            callbackContext.success(token);
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }

    private void getGUID(Context context, CallbackContext callbackContext) {
        try {
            String GUID = NetcoreSDK.getGUID(context);
            callbackContext.success(GUID);
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
    private void getNotifications(Context context,int notificationCount, CallbackContext callbackContext) {
        try {
            JSONArray notificationsList = NetcoreSDK.getNotifications(context,notificationCount);
            callbackContext.success(notificationsList.toString());
        } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Exception: "+e.getMessage());
        }
    }
}
