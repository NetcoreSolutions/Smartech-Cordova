package com.smartech.ionicdemo;

import android.app.Application;

import in.netcore.smartechfcm.NetcoreSDK;

public class MyApplication extends Application {
  private static final String appID ="e7fe27a19b75335a74dda791b07d3f00";
  @Override
  public void onCreate() {
    super.onCreate();
    NetcoreSDK.register(this,appID);
    //NetcoreSDK.setPushIcon(this,R.drawable.ic_notification);
  }
}
