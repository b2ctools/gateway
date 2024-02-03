import { envVarValues, envVarsSchema } from './config.schema';


interface HashMap {
  [key: string]: number | string;
}

class ConfigurationService {
  private elements: HashMap = {};

  constructor(){
    this.init();
  }

  private toCamelCase(input: string): string {
    return input.toLowerCase().replace(/_(.)/g, (_, match) => match.toUpperCase());
  }

  private validate(){
    const { error, value: envVars } = envVarsSchema.validate(envVarValues);
    if (error) {
      throw new Error(`Enviroment Variables Configuration Error: ${error.message}`);
    }
    return envVars;
  }

  private buildAppConfigValues(values: HashMap){
    Object.entries(values).map(entry => {
      const [key, value] = entry;
      this.elements[this.toCamelCase(key)] = value;
    });
  }

  private printConfigValues () {
    console.log(`============ APP ENV VARS CONFIG ================`)
    Object.entries(this.getAll()).map(e => console.log(e))
    console.log(`=================================================`)
  }

  private init() {
    const envVars = this.validate()
    this.buildAppConfigValues(envVars);
    this.printConfigValues()
    
  }

  get(key: string): string | number {
    return this.elements[key];
  }

  getAll(): HashMap {
    return this.elements;
  }

}

export const config = new ConfigurationService();
