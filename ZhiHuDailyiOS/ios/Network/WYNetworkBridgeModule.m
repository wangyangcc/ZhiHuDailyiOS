//
//  WYNetworkBridgeModule.m
//  ZhiHuDailyiOS
//
//  Created by wangyangyang on 15/11/6.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "WYNetworkBridgeModule.h"
#import "AFNetworking.h"

@implementation WYNetworkBridgeModule

RCT_EXPORT_MODULE()

/**
 *  得到首页的数据
 *
 *  @param NSString 具体的日期，格式:20151101，为nil时为最新的
 */
RCT_EXPORT_METHOD(getHomeListWithTimeString:(NSString *)timeString
                  failureCallback:(__unused RCTResponseSenderBlock)failureCallback
                  successCallback:(RCTResponseSenderBlock)successCallback)
{
  NSString *urlPathStr = [NSString stringWithFormat:@"http://news-at.zhihu.com/api/4/stories/%@?client=0",timeString?:@"latest"];
  
  AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
  
  NSError *serializationError = nil;
  NSMutableURLRequest *requestOne = [manager.requestSerializer requestWithMethod:@"GET" URLString:urlPathStr parameters:nil error:&serializationError];
  requestOne.timeoutInterval = 10;
  
  AFHTTPRequestOperation *operation = [manager HTTPRequestOperationWithRequest:requestOne success:^(AFHTTPRequestOperation *operation, id responseObject) {
    if (successCallback) {
      successCallback(@[responseObject]);
    }
  } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
    if (failureCallback) {
      failureCallback(@[error]);
    }
  }];
  [manager.operationQueue addOperation:operation];
}

@end
