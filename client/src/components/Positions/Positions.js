import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {Button} from '@material-ui/core';
import Spinner from 'react-spinner-material';
import PositionsList from "./PositionsList";
import SearchBar from "../UI/SearchBar";
import UserContext from "../../context/user-context";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";
import withSearchBar from "../../hoc/withSearchBar";

const Positions = props => {
   const userContext = useContext(UserContext),
         [positionsState, setPositionState] = useState({
            positions: null
         });

   useEffect(() => {
      const searchPositionsCall = async () => await searchPositions("/api/positions");
      searchPositionsCall();
   }, []);
   
   const submitSearchHandler = async e => {
      e.preventDefault();
      await searchPositions(`/api/positions?${props.searchOption}=${props.searchInputValue}`);
   }
   
   const searchPositions = searchUrl => {
      props.startLoadingHandler();
      fetch(searchUrl)
         .then(response => response.json())
         .then(({error, positions}) => {
            if(error) throw new Error(error.message);
            setPositionState({positions});
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }

   return (
      <div>
         <h1>
            Positions
         </h1>
         <SearchBar options={["name", "riskLevel"]} 
                    selectOption={props.searchOption} 
                    searchInput={props.searchInputValue} 
                    changeHandler={props.updateSearchInput}
                    submitHandler={submitSearchHandler} />
         <Button color="primary" onClick={() => searchPositions("/api/positions")}>
            Clear search
         </Button>
         {userContext.isCompany && <Link to={`/positions/create`}> Create a position </Link>}
         {positionsState.positions && <PositionsList positions={positionsState.positions} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(withSearchBar(Positions)));