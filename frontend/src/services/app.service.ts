export class AppService {
    public async GetPublicReports(): Promise<any> {
        const response = await fetch('https://data.eindhoven.nl/api/records/1.0/analyze/?dataset=meldingen-openbare-ruimte&q=&rows=10000&sort=aangemaakt&refine.onderwerp=12.2+straatnaambord&x=buurt&y.publicreports.func=COUNT');
        return await response.json();
    }

    public async GetNeighbourhoodInfo(): Promise<any> {
        const response = await fetch('https://data.eindhoven.nl/api/records/1.0/search/?dataset=buurten&q=&fields=buurtcode,buurtnaam&rows=10000');
        return await response.json();
    }

    public async GetResidents(): Promise<any> {
        const response = await fetch('https://data.eindhoven.nl/api/records/1.0/search/?dataset=selectiontableasjsonashx&q=&rows=10000&refine.jaar=2023&fields=buurtcode,totaal_aantal_inwoners');
        return await response.json();
    }
}