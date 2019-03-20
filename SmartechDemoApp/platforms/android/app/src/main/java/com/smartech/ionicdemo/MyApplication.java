package com.smartech.ionicdemo;

import android.app.Application;

import in.netcore.smartechfcm.NetcoreSDK;

public class MyApplication extends Application {
  private static final String appID ="<SMARTECH_PANEL_APP_ID>";
  @Override
  public void onCreate() {
    super.onCreate();
    NetcoreSDK.register(this,appID);
    //NetcoreSDK.setPushIcon(this,R.drawable.ic_notification);
  }
}
