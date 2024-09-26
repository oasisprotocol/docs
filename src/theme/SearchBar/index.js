import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import AskCookbook from '@cookbookdev/docsbot/react'
import BrowserOnly from '@docusaurus/BrowserOnly';
/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmIyODhmOTM3ZWIwYzRiMTVlZDM5ZmIiLCJpYXQiOjE3MjI5NzY1MDUsImV4cCI6MjAzODU1MjUwNX0.SI_acMGkzJiSDAsqzRmSCQTUEiIrt8L_i7lWnSRmkkA";
export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <BrowserOnly>{() => <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} /> }</BrowserOnly>
    </>
  );
}
