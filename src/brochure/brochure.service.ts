import { Global, Injectable } from '@nestjs/common';
import { CreateBrochureDto } from './dto/create-brochure.dto';
import { UpdateBrochureDto } from './dto/update-brochure.dto';

import { Configuration, OpenAIApi } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BrochureService {
  constructor(private configService: ConfigService) {}

  configuration = new Configuration({
    apiKey: this.configService.get('OPENAI_API_KEY'),
  });
  openai = new OpenAIApi(this.configuration);

  async processBrochure(createBrochureDto: CreateBrochureDto) {
    const aiPrompt = buildPrompt(createBrochureDto);

    console.log(aiPrompt);

    console.log('stuff is cool')

    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: aiPrompt,
      max_tokens: 2000,
      temperature: 0.2,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: '###',
    });

    const response = completion.data.choices[0].text.trim();

    return JSON.parse(response);
  }

  create(createBrochureDto: CreateBrochureDto) {
    return 'This action adds a new brochure';
  }

  findAll() {
    return `This action returns all brochure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brochure`;
  }

  update(id: number, updateBrochureDto: UpdateBrochureDto) {
    return `This action updates a #${id} brochure`;
  }

  remove(id: number) {
    return `This action removes a #${id} brochure`;
  }
}

function buildPrompt(createBrochureDto: CreateBrochureDto) {
  let prompt = `### We have a real estate listing with the following description:\n`;
  prompt += `${createBrochureDto.text}\n\n`;

  createBrochureDto.features.forEach((feature) => {
    prompt += `Based on this listing, does the property have the feature titled ${feature}?\n`;
  });

  prompt += `Response with a JSON object containing the {Feature Title} as the key, and {True / False} as the value.\n`;
  prompt += `###\n`;
  return prompt;
}
