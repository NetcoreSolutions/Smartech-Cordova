#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>



@interface LocationManager : NSObject <CLLocationManagerDelegate>
{
  CLLocationManager *locationManager;
}

@property (strong, nonatomic) NSString *longitude;
@property (strong, nonatomic) NSString *latitude;
@property (strong, nonatomic) CLLocation *currentLocation;

+ (instancetype)sharedInstance;

@end
