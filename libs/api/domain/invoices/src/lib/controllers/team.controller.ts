import type { Request, Response } from 'express';
import { teamService } from '../services/team.service';

const getTeam = async (req: Request, res: Response) => {
  const { name, gstin } = req.query || {};
  const column = name ? 'company_name' : gstin ? 'company_gstin' : '';
  const payload = name || gstin;
  if (payload && typeof payload === 'string' && column) {
    const teamData = await teamService.getTeam(column, payload);
    return res.status(200).json(teamData);
  }
};

const getTeams = async (req: Request, res: Response) => {
  const name = req.query || {};
  if (name && typeof name === 'string') {
    const teamsData = await teamService.getTeamsByName(name);
    return res.status(200).json(teamsData);
  }else {
    const teamsData = await teamService.getTeams();
    return res.status(200).json(teamsData);
  }
};

export const teamController = {
  getTeam,
  getTeams,
};
