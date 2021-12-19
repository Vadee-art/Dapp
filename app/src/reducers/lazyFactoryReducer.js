import {
  WALLET_CONNECT_REQUEST,
  WALLET_CONNECT_SUCCESS,
  WALLET_CONNECT_FAIL,
  BUYER_MINT_AND_REDEEM_FAIL,
  BUYER_MINT_AND_REDEEM_REQUEST,
  BUYER_MINT_AND_REDEEM_SUCCESS,
  DEPLOY_MY_STORE_FAIL,
  DEPLOY_MY_STORE_REQUEST,
  DEPLOY_MY_STORE_RESET,
  DEPLOY_MY_STORE_SUCCESS,
  SIGN_MY_ITEM_FAIL,
  SIGN_MY_ITEM_REQUEST,
  SIGN_MY_ITEM_RESET,
  SIGN_MY_ITEM_SUCCESS,
} from '../constants/lazyFactoryConstants';
import {
  MARKET_ROYALTY_LIST_FAIL,
  MARKET_ROYALTY_LIST_REQUEST,
  MARKET_ROYALTY_LIST_SUCCESS,
} from '../constants/marketPlaceConstants';

export const walletConnectionReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_CONNECT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case WALLET_CONNECT_SUCCESS:
      return {
        loading: false,
        success: true,
        wallet: action.payload,
      };
    case WALLET_CONNECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const storeDeployReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPLOY_MY_STORE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case DEPLOY_MY_STORE_SUCCESS:
      return {
        loading: false,
        success: true,
        BLOCKCHAIN: action.payload,
      };
    case DEPLOY_MY_STORE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DEPLOY_MY_STORE_RESET:
      return {};
    default:
      return state;
  }
};

export const voucherReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_MY_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case SIGN_MY_ITEM_SUCCESS:
      return {
        loading: false,
        success: true,
        voucher: action.payload.voucher,
        signerAddress: action.payload.signerAddress,
      };
    case SIGN_MY_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SIGN_MY_ITEM_RESET:
      return {};
    default:
      return state;
  }
};

export const mintAndRedeemReducer = (state = {}, action) => {
  switch (action.type) {
    case BUYER_MINT_AND_REDEEM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case BUYER_MINT_AND_REDEEM_SUCCESS:
      return {
        loading: false,
        success: true,
        purchased: action.payload,
      };
    case BUYER_MINT_AND_REDEEM_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const marketRoyaltyListReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_ROYALTY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case MARKET_ROYALTY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        allMarketRoyalties: action.payload,
      };
    case MARKET_ROYALTY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
