from __future__ import annotations
from sys import version as sys_version
from argparse import ArgumentParser
from pandas import read_html
from requests import get
from json import dumps as to_json_str

CRHL_SOURCE_MAPPINGS = {
    'column_names': {
        'Type': 'type', 'Name': 'name', 'Locale': 'locale', 'Position': 'position',
        'Availability': 'availability', 'Skill Level': 'skill_level',
        'Minimum Notice': 'minimum_notice', 'Contact Info': 'contact_info'
    },
    'position_values': {
      'Any': 'Defence/Forward', 'Defence': 'Defence', 'Forward': 'Forward', 'Goalie': 'Goalie'
    },
    'skill_level_values': {
        'Division 1-3 (Highest)': 'High', 'Division 4-6': 'Medium', 'Division 7-30+': 'Low'
    }
}

class FreeAgentsManager(object):
    """
    Use this class to fetch and manipluate free agents from different sources.
    """
    crhl_source = None
    free_agents = []

    def fetch(self):
        """
        Fetches all configured free agent sources that are configured and adds them to the list of
        free agents.
        """

        # reset list of free agents
        self.reset()

        # fetch free agents from provided source(s) and add to list
        if self.crhl_source:
            crhl_agents = self._get_crhl_free_agents(self.crhl_source)
            self.free_agents.extend(crhl_agents if crhl_agents else [])

    def reset(self):
        """
        Call to clear existing free agents. This method is called automatically when calling the
        fetch method.
        """

        self.free_agents.clear()

    def _get_crhl_free_agents(self, url):
        """
        Retrieves all CRHL free agents from provided URL and transforms them into a list of free
        agent objects.
        """

        # fetch CRHL free agents from configured source
        response = get(url, headers={'user-agent': f'python/{sys_version}'})

        # parse free agents table from response text
        table = read_html(io=response.text, attrs={'id': 'agent_list_table'})[0]

        # normalize and select columns based on column name mapping
        table = table.rename(columns=CRHL_SOURCE_MAPPINGS['column_names'])[
            [*CRHL_SOURCE_MAPPINGS['column_names'].values()]
        ]

        # remove any free agents that do not have availability or contact information
        table = table[
            table['availability'].notna()
            & ~table['contact_info'].str.startswith('Click to view e-mail', na=True)
        ]

        # split contact info values into email and phone columns
        table['email'] = table['contact_info'].str.lower().str.extract(r'(\S+@\S+)')
        table['phone'] = table['contact_info'].str.extract(r'(\d{3}[-\.\s]\d{3}[-\.\s]\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]\d{4}|\d{3}[-\.\s]\d{4})')

        # normalize position values based on position mapping
        table = table.replace({'position': CRHL_SOURCE_MAPPINGS['position_values']})

        # normalize skill level values based on skill level mapping
        table = table.replace({'skill_level': CRHL_SOURCE_MAPPINGS['skill_level_values']})

        # remove contact info column as it is not required
        table = table.drop('contact_info', axis='columns')

        # add CRHL source to table
        table['source'] = 'CRHL'

        # transform table into list of free agents
        agents = table.dropna().to_dict('records')

        # return list of free agents
        return agents

    @staticmethod
    def from_argument_parser(crhl_source) -> FreeAgentsManager:
        """
        Returns an initialized free agents manager from command line argument parser values.
        """

        # initialize manager
        manager = FreeAgentsManager()

        # configure manager attributes from provided parameters
        if crhl_source:
            manager.crhl_source = crhl_source

        # return initialized and configured manager
        return manager

if __name__ == '__main__':

    parser = ArgumentParser()

    # optional arguments
    parser.add_argument('-crhl', '--crhl-source', help='Address of CRHL free agents. Default: https://www.crhl.com/free-agents/',
                         metavar='<URL>', default='https://www.crhl.com/free-agents/')
    # parser.add_argument('-o', '--output', help='File path for output of free agents. Default: free_agents.json',
    #                      metavar='<PATH>', default='free_agents.json')

    # create required argument group
    required_args = parser.add_argument_group('required arguments')

    # parse arguments and halt if required are not provided
    args = parser.parse_args()

    # print arguments for transparency
    # print('Fetching free agents with the following arguments:')
    # print(f'  --crhl-source  : {args.crhl_source}')

    # create free agents manager from arguments
    manager = FreeAgentsManager.from_argument_parser(args.crhl_source)

    # fetch free agents from source(s)
    manager.fetch()

    # transform free agents to json formatted string
    agents = to_json_str(manager.free_agents)

    # TODO: output free agents to file path argument
    print(agents, end='')
