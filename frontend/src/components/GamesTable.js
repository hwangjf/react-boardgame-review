import React from 'react';

const GamesTable = (props) => {
  return (
    props ?
    <table className="games">
      <tbody>
        {props.games.map(game=>{
          return (
            <tr key={game.id} >
              <th>
                <h3 className="">{game.name}</h3>
              </th>
              <th>
                <h3 className="">{game.genre.name}</h3>
              </th>
            </tr>
          )
        })
        }
      </tbody>
    </table>
    :
    null
  )
}

export default GamesTable;
