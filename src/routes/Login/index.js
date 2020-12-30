import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useAppContext } from "../../libs/contextLib";
import { parseQuery } from "../../functions/Functions";
import storage from "../../functions/Storage";
import Loader from "../../components/Loader";

export default () => {
  const code = new URLSearchParams(window.location.search).get("code") || "";
  const id = new URLSearchParams(window.location.search).get("id") || "";
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://login.exokit.org/?discordcode=${code}&discordid=${id}`, {method: 'POST'});
      const j = await res.json();
      const {mnemonic} = j;
      if (mnemonic) {
        await setGlobalState({...globalState, loginToken: { mnemonic } });
        await storage.set("globalState", {...globalState, loginToken: { mnemonic } });
        location.href = '/save';
      } else {
        console.warn('no mnemonic returned from api');
      }
    })();
  }, []);

  return (
    <div>
      <Loader loading={true} />
    </div>
  )
}
