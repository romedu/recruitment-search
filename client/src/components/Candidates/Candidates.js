import React, {useState, useEffect} from "react";
import Spinner from 'react-spinner-material';
import {Button} from '@material-ui/core';
import CandidatesList from "./CandidatesList";
import SearchBar from "../UI/SearchBar";
import {getFetchOptions} from "../../utils/fetchUtils";
import withErrorModal from "../../hoc/withErrorModal";
import withLoader from "../../hoc/withLoader";
import withSearchBar from "../../hoc/withSearchBar";

const Candidates = props => {
   const {positionId} = props.match.params, 
         [candidatesState, setCandidatesState] = useState({
            candidates: null,
            nextPage: 1,
            isDataFiltered: false
         });
   
   useEffect(() => {
      const searchCandidatesCall = async () => await searchCandidates(`/api/positions/${positionId}/candidates?page=1`, true);
      searchCandidatesCall();
   }, []);
   
   const submitSearchHandler = async e => {
      e.preventDefault();
      setCandidatesState({
         candidates: null,
         nextPage: 1,
         isDataFiltered: true
      });
      await searchCandidates(`/api/positions/${positionId}/candidates?${props.searchOption}=${props.searchInputValue}&page=1`, true);
   }
   
   const resetSearchHandler = () => {
      setCandidatesState({
         candidates: null,
         nextPage: 1,
         isDataFiltered: false
      });
      searchCandidates(`/api/positions/${positionId}/candidates?page=1`, true);
   }
   
   const searchCandidates = (searchUrl, isReplacingData) => {
      const token = localStorage.getItem("token"),
            fetchOptions = getFetchOptions("GET", token);
            
      props.startLoadingHandler();
       
      fetch(searchUrl, fetchOptions)
         .then(response => response.json())
         .then(({error, candidates}) => {
            if(error) throw new Error(error.message);
            if(isReplacingData) setCandidatesState(prevState => ({...prevState, candidates: candidates.docs, nextPage: candidates.nextPage}));
            else setCandidatesState(prevState => ({
               ...prevState,
               candidates: candidatesState.candidates.concat(candidates.docs), 
               nextPage: candidates.nextPage
            }));
            props.stopLoadingHandler();
         })
         .catch(error => {
            props.stopLoadingHandler();
            props.openModalHandler(error.message);
         })
   }
   
   window.onscroll = () => {
      const {nextPage, isDataFiltered} = candidatesState,
            bottomScrollPosition = document.documentElement.offsetHeight,
            currentScrollPosition = window.innerHeight + document.documentElement.scrollTop;
      
      if (currentScrollPosition === bottomScrollPosition && !props.isLoading && nextPage){
         if(isDataFiltered) searchCandidates(`/api/positions/${positionId}/candidates?${props.searchOption}=${props.searchInputValue}&page=${nextPage}`);
         else searchCandidates(`/api/positions/${positionId}/candidates?page=${nextPage}`);
      }
   };

   return (
      <div>
         <h1>
            Candidates
         </h1>
         <SearchBar options={["department", "recommendedBy"]} 
                    selectOption={props.searchOption} 
                    searchInput={props.searchInputValue} 
                    changeHandler={props.updateSearchInput}
                    submitHandler={submitSearchHandler} />
         <Button color="primary" onClick={resetSearchHandler}>
            Clear search
         </Button>
         {candidatesState.candidates && <CandidatesList positionId={positionId} candidates={candidatesState.candidates} />}
         <Spinner size={60} spinnerColor={"#C836C3"} spinnerWidth={5} visible={props.isLoading} />
      </div>
   )
}

export default withErrorModal(withLoader(withSearchBar(Candidates)));