import axios from "../Api";


export const getTeamOptions = () => {
  return axios.get("/teams/list/").then(({ data }: any) => {
    return data.data.teams.map((el: any) => ({
      value: el.team_id,
      label: el.team_name,
    }));
  }).catch(console.error);
};

export const getAgencyOptions = () => {
  return axios.get("/teams/agency/list/").then(({ data }: any) => {
    return data.data.agency.map((el: any) => ({
      value: el.agency_id,
      label: el.agency_name,
    }));
  }).catch(console.error);
};