import { RMPTeamModel } from '@rmp/shared-models';
import { db } from '@rmp/shared-core';
import {  mapRMPTeamModelToDomain } from '@rmp/shared-util';

const getTeams = async (limit: number = 10) => {
  const teams = ((await db('teams').select('*').limit(limit)) || []) as RMPTeamModel[];
  return teams.map(mapRMPTeamModelToDomain);
};

const getTeam = async (columnSearch: 'company_name' | 'company_gstin', columnPaylaod: string) => {
  const team = (await db('teams')
    .select('*')
    .where(columnSearch, '=', columnPaylaod)
    .first()) as RMPTeamModel;
  if (team) return mapRMPTeamModelToDomain(team);
  return null;
};

const getTeamsByName = async (name: string) => {
  const teams = ((await db('teams').select('*').where('company_name', 'like', `%${name}%`)) ||
    []) as RMPTeamModel[];
  return teams.map(mapRMPTeamModelToDomain);
};

export const teamService = {
  getTeam,
  getTeams,
  getTeamsByName,
};
