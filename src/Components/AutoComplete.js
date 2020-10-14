import React, {useContext} from 'react';
import {JikanContext} from "../context/JikanContext"
import AsyncSelect from "react-select/async"
import { components } from 'react-select';
 
const AutoComplete = () =>  {

  const {selectedUsers, FetchData, changeState} = useContext(JikanContext)

  const onChange = (selectedUser) => {
    changeState(selectedUser);
  }

  const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 2 ? (
          props.children
        ) : (
          <div>Max limit achieved</div>
        )}
      </components.Menu>
    );
  };

  const isValidNewOption = (inputValue, selectValue) => inputValue.length > 0 && selectValue.length < 2;
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <AsyncSelect
            className="mb-3"
            isMulti
            components={{ Menu }}
            isValidNewOption={isValidNewOption}
            value={selectedUsers}
            onChange={onChange}
            placeholder={"Seiyuu name!"}
            loadOptions={FetchData}
          />
          <small className="form-text text-white">(don't copy past Seiyuu name) write it eg: Taneda, Risa (it will show suggestions select from that)</small>
        </div>
      </div>
      <div className="row">
          {selectedUsers.length > 0 && selectedUsers.map(seiyuu => {
            return (
              <div className="col-md-6 col-xs-12 mt-3" key={seiyuu.value}>
                <div className="card m-auto mb-2" style={{width: '18rem'}}>
                <img className="img-fluid" src={seiyuu.avatar} alt={seiyuu.name} />
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title text-center mt-3 mb-3">{seiyuu.name}</h5>
                    <a href={seiyuu.url} target="_blank" rel="noopener noreferrer" className="text-center button">View at MyanimeList</a>  
                  </div>
                </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AutoComplete;

