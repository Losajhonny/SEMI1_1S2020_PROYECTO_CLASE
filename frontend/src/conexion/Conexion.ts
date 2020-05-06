export default
class Conexion
{
    // direccion del servidor
    private static locationServer: string = "https://cc8bydasd8.execute-api.us-east-2.amazonaws.com/invoguate";

    // direccion para obtener una traduccion
    public static locationTraducir: string = Conexion.locationServer + "/translate";

    // direccion para obtener un audio polly
    public static locationPolly: string = Conexion.locationServer + "/polly";

    // singleton conexion
    private static CONEXION: Conexion;

    public static getInstance(): Conexion {
        if(this.CONEXION === null || this.CONEXION === undefined) {
            this.CONEXION = new Conexion();
        }
        return this.CONEXION;
    }

    async POST(request: any, url: string) {
        console.log(url);

        const option = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type' : 'application/json'},
            body: JSON.stringify(request)
        }

        let res: any = null;

        await fetch(url, option)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                res = data;
            })
            .catch((ex) => {
                console.log(ex);
                res = null;
            });

        return res;
    }

    async GET(url: string) {
        console.log(url);
        
        const option = {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type' : 'application/json'}
        }

        let res: any = null;

        await fetch(url, option)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                res = data;
            })
            .catch((ex) => {
                console.log(ex);
                res = null;
            });

        return res;
    }
}