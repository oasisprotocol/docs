import React from 'react';

const AddToMetaMask = (props: {
  name: string,
  chainId: string,
  token: string,
  rpcs: string[],
  be: string[],
}) => {
  return (
    <span>
      {props.rpcs.map(item => (
        <code key={item}>{item}<br/></code>
      ))}
      <button
        className="button button--primary margin-top--md"
        onClick={() => {
          if (!window.ethereum?.request) {
            return alert('Have you installed MetaMask yet? If not, please do so.\n\nComputer: Once it is installed, you will be able to add the ParaTime to your MetaMask.\n\nPhone: Open the website through your MetaMask Browser to add the ParaTime.')
          }
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: props.chainId,
                chainName: props.name,
                nativeCurrency: {
                  name: props.token,
                  symbol: props.token,
                  decimals: 18,
                },
                rpcUrls: props.rpcs,
                blockExplorerUrls: props.be,
              },
            ],
          })
        }}
      >
        Add to MetaMask
      </button>
    </span>
  );
};

export const AddSapphireToMetaMask = (props: {
  rpcs: string[],
}) => {
  return AddToMetaMask({
    name: 'Oasis Sapphire',
    chainId: '0x5afe',
    token: 'ROSE',
    rpcs: props.rpcs,
    be: ['https://explorer.oasis.io/mainnet/sapphire'],
  });
};

export const AddSapphireTestnetToMetaMask = (props: {
  rpcs: string[],
}) => {
  return AddToMetaMask({
    name: 'Oasis Sapphire Testnet',
    chainId: '0x5aff',
    token: 'TEST',
    rpcs: props.rpcs,
    be: ['https://explorer.oasis.io/testnet/sapphire'],
  });
};

export const AddEmeraldToMetaMask = (props: {
  rpcs: string[],
}) => {
  return AddToMetaMask({
    name: 'Oasis Emerald',
    chainId: '0xa516',
    token: 'ROSE',
    rpcs: props.rpcs,
    be: ['https://explorer.oasis.io/mainnet/emerald'],
  });
};

export const AddEmeraldTestnetToMetaMask = (props: {
  rpcs: string[],
}) => {
  return AddToMetaMask({
    name: 'Oasis Emerald Testnet',
    chainId: '0xa515',
    token: 'TEST',
    rpcs: props.rpcs,
    be: ['https://explorer.oasis.io/testnet/emerald'],
  });
};
