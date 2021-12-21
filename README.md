Finish Boiler Plate
rebuild front and back with typscrypt and packages.jsons scoped to those folders

then test package json outside of those folders.

making uniqie types: https://stackoverflow.com/questions/60777859/ts2339-property-tsreducer-does-not-exist-on-type-defaultrootstate

Create RootState type in Root Reducer.
export const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>
Provide RootState type to state object.
  let userData = useSelector((state: RootState) => {
    return state.user.data;
  });



react events: https://stackoverflow.com/questions/42081549/typescript-react-event-types
for update: event: React.ChangeEvent for submit: event: React.FormEvent for click: event: React.MouseEvent

model/migration generate template: npx sequelize model:generate --name=... --attributes=...

use sad and happy dug in readme

npx dotenv sequelize-cli db:seed:undo:all && npx dotenv sequelize-cli db:migrate:undo:all && npx dotenv sequelize-cli db:migrate && npx dotenv sequelize-cli db:seed:all


mui 
1. buttons
2. clider
3. toggle
4. modal
5. icon github


update dead tabs

