class MyBackEnd {
    _apiBase = 'http://localhost:3000/';

    // Используем async/await напрямую без.then()
    getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getGoalsProgressInfo = async () => {
        try {
            const data = await this.getResource(`${this._apiBase}progressinfo`);

            if (!Array.isArray(data)) {
                throw new Error('Data not found or is not an array');
            }

            return data;
        } catch (error) {
            throw new Error(`Error fetching goals progress info: ${error.message}`);
        }
    };

    getGoals = async () => {
        try {
            const data = await this.getResource(`${this._apiBase}/progressInfo`);

            if (!Array.isArray(data)) {
                throw new Error('Data not found or is not an array');
            }

            // Преобразование данных в нужный формат
            return data.map(item => ({ text: item.id }));
        } catch (error) {
            throw new Error(`Error fetching goals progress info: ${error.message}`);
        }
    };

    getPrize = async (goalId) => {
        try {
            const data = await this.getResource(`${this._apiBase}user-prizes/${goalId}`);

            return data;
        } catch (error) {
            throw new Error(`Error fetching prize info: ${error.message}`);
        }
    };

    getResults = async (progressInfoId) => {
        try {
            const data = await this.getResource(`${this._apiBase}progressinfo/${progressInfoId}`);

            return data.results;
        } catch (error) {
            throw new Error(`Error fetching results: ${error.message}`);
        }
    };

    getHelps = async () => {
        try {
            const data = await this.getResource(`${this._apiBase}help-req/`);

            return data;
        } catch (error) {
            throw new Error(`Error fetching results: ${error.message}`);
        }
    };
}

export default MyBackEnd;
