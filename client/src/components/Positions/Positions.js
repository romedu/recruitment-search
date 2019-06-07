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
            positions: null,
            nextPage: 1,
            isDataFiltered: false
         });

   useEffect(() => {
      const searchPositionsCall = () => searchPositions("/api/positions?page=1", true);
      searchPositionsCall();
   }, []);
   
   const submitSearchHandler = e => {
      e.preventDefault();
      setPositionState({
         positions: null, 
         nextPage: 1,
         isDataFiltered: true
      });
      searchPositions(`/api/positions?${props.searchOption}=${props.searchInputValue}&page=1`, true);
   }
   
   const resetSearchHandler = () => {
      setPositionState({
         positions: null, 
         nextPage: 1,
         isDataFiltered: false
      });
      searchPositions("/api/positions?page=1", true);
   }
   
   const searchPositions = (searchUrl, isReplacingData) => {
      props.startLoadingHandler();
      fetch(searchUrl)
         .then(response => response.json())
         .then(({error, positions}) => {
            if(error) throw new Error(error.message);
            if(isReplacingData) setPositionState(prevState => ({...prevState, positions: positions.docs, nextPage: positions.nextPage}));
            else setPositionState(prevState => ({
               ...prevState,
               positions: positionsState.positions.concat(positions.docs), 
               nextPage: positions.nextPage
            }));
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }
   
   window.onscroll = () => {
      const {nextPage, isDataFiltered} = positionsState,
            bottomScrollPosition = document.documentElement.offsetHeight,
            currentScrollPosition = window.innerHeight + document.documentElement.scrollTop;
      
      if (currentScrollPosition === bottomScrollPosition && !props.isLoading && nextPage){
         if(isDataFiltered) searchPositions(`/api/positions?${props.searchOption}=${props.searchInputValue}&page=${nextPage}`);
         else searchPositions(`/api/positions?page=${nextPage}`);
      }
   };

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
         <Button color="primary" onClick={resetSearchHandler}>
            Clear search
         </Button>
         {userContext.isCompany && <Link to={`/positions/create`}> Create a position </Link>}
         {positionsState.positions && <PositionsList positions={positionsState.positions} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(withSearchBar(Positions)));