import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {authReducers} from "./store/reducers";
import {AUTH_CONFIG_TOKEN, AUTH_LOCAL_STORAGE_KEY, AUTH_STORAGE_KEYS} from "./auth.tokens";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/effects";
import {INIT_AUTH_STATE} from "./store/state";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {MetaReducer} from "@ngrx/store/src/models";
import {storageMetaReducerFactory} from "../shared/services/storage.metareducer";
import {EAuthActions} from "./constants/constants";

const grantedActions = [
  EAuthActions.LOGIN_SUCCESS,
  EAuthActions.LOGOUT_SUCCESS,
  EAuthActions.GET_USER_SUCCESS,
];

export function getAuthConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
): { metaReducers: MetaReducer<any>[] } {
  return {
    metaReducers: [
      storageMetaReducerFactory(saveKeys, localStorageKey, storageService, grantedActions),
    ],
  };
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducers, AUTH_CONFIG_TOKEN),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthEffects,
    {provide: AUTH_LOCAL_STORAGE_KEY, useValue: '__auth_storage__'},
    {provide: AUTH_STORAGE_KEYS, useValue: Object.keys(INIT_AUTH_STATE)},
    {
      provide: AUTH_CONFIG_TOKEN,
      deps: [AUTH_STORAGE_KEYS, AUTH_LOCAL_STORAGE_KEY, LocalStorageService],
      useFactory: getAuthConfig,
    },
  ]
})
export class AuthModule {
}
