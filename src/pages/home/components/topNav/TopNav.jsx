import React from "react";
import { useState, useEffect, useRef } from "react";
export let PAddressRef = "";

function TopNav({ contract, account }) {
  PAddressRef = useRef(null);
  const [isDoc, setIsDoc] = useState(false);

  useEffect(() => {
    const getDoctorList = async () => {
      const docList = await contract.get_doctor_list();
      for (let i = 0; i < docList.length; i++) {
        let docAccount = docList[i];
        if (docAccount === account) {
          setIsDoc(true);
          break;
        }
      }
    };

    getDoctorList();
  }, [contract, account]);

  return (
    <div className="TopNav">
      {isDoc ? (
        <>
          <form>
            <input
              ref={PAddressRef}
              type="text"
              id="search"
              placeholder="Search for Address"
            />
          </form>
        </>
      ) : null}
      <button>
        <a href="home/upload">Upload Record</a>
      </button>
      <p>{account ? account : "not connected"}</p>
    </div>
  );
}

export default TopNav;