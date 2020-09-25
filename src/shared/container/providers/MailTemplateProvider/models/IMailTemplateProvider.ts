import IParseMailTemplateDTO from '../dtos/IPardeMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
