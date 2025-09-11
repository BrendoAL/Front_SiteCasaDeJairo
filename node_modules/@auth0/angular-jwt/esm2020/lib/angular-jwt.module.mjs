import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { JWT_OPTIONS } from './jwtoptions.token';
import { JwtHelperService } from './jwthelper.service';
import * as i0 from "@angular/core";
export class JwtModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error(`JwtModule is already loaded. It should only be imported in your application's main module.`);
        }
    }
    static forRoot(options) {
        return {
            ngModule: JwtModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: JwtInterceptor,
                    multi: true,
                },
                options.jwtOptionsProvider || {
                    provide: JWT_OPTIONS,
                    useValue: options.config,
                },
                JwtHelperService,
            ],
        };
    }
}
JwtModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtModule, deps: [{ token: JwtModule, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.NgModule });
JwtModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: JwtModule });
JwtModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: JwtModule, decorators: [{
            type: NgModule
        }], ctorParameters: function () { return [{ type: JwtModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1qd3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1qd3Qvc3JjL2xpYi9hbmd1bGFyLWp3dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFFBQVEsRUFFUixRQUFRLEVBQ1IsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBb0J2RCxNQUFNLE9BQU8sU0FBUztJQUNwQixZQUFvQyxZQUF1QjtRQUN6RCxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUNiLDRGQUE0RixDQUM3RixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixLQUFLLEVBQUUsSUFBSTtpQkFDWjtnQkFDRCxPQUFPLENBQUMsa0JBQWtCLElBQUk7b0JBQzVCLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLE1BQU07aUJBQ3pCO2dCQUNELGdCQUFnQjthQUNqQjtTQUNGLENBQUM7SUFDSixDQUFDOztzR0F4QlUsU0FBUzt1R0FBVCxTQUFTO3VHQUFULFNBQVM7MkZBQVQsU0FBUztrQkFEckIsUUFBUTs7MEJBRU0sUUFBUTs7MEJBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFByb3ZpZGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXF1ZXN0LCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi9qd3QuaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgSldUX09QVElPTlMgfSBmcm9tICcuL2p3dG9wdGlvbnMudG9rZW4nO1xuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gJy4vand0aGVscGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEp3dENvbmZpZyB7XG4gIHRva2VuR2V0dGVyPzogKFxuICAgIHJlcXVlc3Q/OiBIdHRwUmVxdWVzdDxhbnk+XG4gICkgPT4gc3RyaW5nIHwgbnVsbCB8IFByb21pc2U8c3RyaW5nIHwgbnVsbD47XG4gIGhlYWRlck5hbWU/OiBzdHJpbmc7XG4gIGF1dGhTY2hlbWU/OiBzdHJpbmcgfCAoKHJlcXVlc3Q/OiBIdHRwUmVxdWVzdDxhbnk+KSA9PiBzdHJpbmcpO1xuICBhbGxvd2VkRG9tYWlucz86IEFycmF5PHN0cmluZyB8IFJlZ0V4cD47XG4gIGRpc2FsbG93ZWRSb3V0ZXM/OiBBcnJheTxzdHJpbmcgfCBSZWdFeHA+O1xuICB0aHJvd05vVG9rZW5FcnJvcj86IGJvb2xlYW47XG4gIHNraXBXaGVuRXhwaXJlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnd0TW9kdWxlT3B0aW9ucyB7XG4gIGp3dE9wdGlvbnNQcm92aWRlcj86IFByb3ZpZGVyO1xuICBjb25maWc/OiBKd3RDb25maWc7XG59XG5cbkBOZ01vZHVsZSgpXG5leHBvcnQgY2xhc3MgSnd0TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBKd3RNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBKd3RNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEl0IHNob3VsZCBvbmx5IGJlIGltcG9ydGVkIGluIHlvdXIgYXBwbGljYXRpb24ncyBtYWluIG1vZHVsZS5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgZm9yUm9vdChvcHRpb25zOiBKd3RNb2R1bGVPcHRpb25zKTogTW9kdWxlV2l0aFByb3ZpZGVyczxKd3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEp3dE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICAgICAgdXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zLmp3dE9wdGlvbnNQcm92aWRlciB8fCB7XG4gICAgICAgICAgcHJvdmlkZTogSldUX09QVElPTlMsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMuY29uZmlnLFxuICAgICAgICB9LFxuICAgICAgICBKd3RIZWxwZXJTZXJ2aWNlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=