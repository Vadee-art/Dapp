import { ethers } from 'ethers';
import artworksBase, { gecko } from '../apis/artworksBase';
import MarketPlace from '../build/contracts/artifacts/contracts/MarketPlace.sol/MarketPlace.json';
import {
  DEPLOY_MARKET_PLACE_FAIL,
  DEPLOY_MARKET_PLACE_REQUEST,
  DEPLOY_MARKET_PLACE_SUCCESS,
  MARKET_ADD_FAIL,
  MARKET_ADD_REQUEST,
  MARKET_ADD_SUCCESS,
  MARKET_BALANCE_FAIL,
  MARKET_BALANCE_REQUEST,
  MARKET_BALANCE_SUCCESS,
  MARKET_PLACE_FAIL,
  MARKET_PLACE_REQUEST,
  MARKET_PLACE_SUCCESS,
  MARKET_ETH_PRICE_REQUEST,
  MARKET_ETH_PRICE_FAIL,
  MARKET_ETH_PRICE_SUCCESS,
} from '../constants/marketPlaceConstants';

export const deployMarketPlace = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPLOY_MARKET_PLACE_REQUEST });

    // eslint-disable-next-line no-undef
    await window.ethereum.enable();
    // eslint-disable-next-line no-undef
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const { chainId } = await provider.getNetwork();
    console.log(`chain Id here: ${chainId}`);

    const marketPlaceFactory = new ethers.ContractFactory(
      MarketPlace.abi,
      MarketPlace.bytecode,
      signer
    );

    const marketPlaceContract = await marketPlaceFactory.deploy();
    await marketPlaceContract.deployTransaction.wait(); // loading before confirmed transaction

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('marketPlaceAddress', marketPlaceContract.address);

    const response = await artworksBase.put(
      `/market/deploy/`,
      formData,
      config
    );
    dispatch({
      type: DEPLOY_MARKET_PLACE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log('problem deploying: ');
    dispatch({
      type: DEPLOY_MARKET_PLACE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchMarketPlace = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MARKET_PLACE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await artworksBase.get(`/market/`, config);
    dispatch({
      type: MARKET_PLACE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_PLACE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const fetchMarketBalance = (contractAddress) => async (dispatch) => {
  try {
    dispatch({ type: MARKET_BALANCE_REQUEST });
    // eslint-disable-next-line no-undef
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const balance = await provider.getBalance("address")
    const balance = await provider.getBalance(contractAddress);
    const balanceInEth = ethers.utils.formatEther(balance);

    dispatch({
      type: MARKET_BALANCE_SUCCESS,
      payload: balanceInEth,
    });
  } catch (e) {
    console.log('problem buying: ');
    console.log({ e });
    dispatch({
      type: MARKET_BALANCE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const createMarketSell =
  (marketAddress, storeAddress, tokenId, price) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MARKET_ADD_REQUEST });
      // eslint-disable-next-line no-undef
      window.ethereum.request({ method: 'eth_requestAccounts' });

      // eslint-disable-next-line no-undef
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const marketPlaceFactory = new ethers.ContractFactory(
        MarketPlace.abi,
        MarketPlace.bytecode,
        signer
      );

      const marketPlaceContract = await marketPlaceFactory.attach(
        marketAddress
      );

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await artworksBase.get(
        `/market/fees/${price.toString()}`,
        config
      );

      const sellingPrice = ethers.utils.parseUnits(price.toString(), 'ether');

      const transaction = await marketPlaceContract.createMarketSell(
        storeAddress,
        tokenId,
        sellingPrice
      );

      await transaction.wait();

      const marketItemCurrent = await marketPlaceContract.fetchCurrentId();
      await marketItemCurrent.wait();

      dispatch({
        type: MARKET_ADD_SUCCESS,
        payload: { transaction, marketItemCurrent },
      });
    } catch (e) {
      console.log('problem adding market item');
      console.log({ e });

      dispatch({
        type: MARKET_ADD_FAIL,
        payload:
          e.response && e.response.data.detail
            ? e.response.data.detail
            : e.message,
      });
    }
  };

export const fetchEthPrice = () => async (dispatch) => {
  try {
    dispatch({ type: MARKET_ETH_PRICE_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await gecko.get(
      `/simple/price?ids=ethereum&vs_currencies=cad`,
      config
    );

    dispatch({
      type: MARKET_ETH_PRICE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MARKET_ETH_PRICE_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};
