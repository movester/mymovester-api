import { Injectable } from '@nestjs/common';
import { CreateStretchingRequest } from './request/create-stretching.request';
import { Stretching } from 'src/persistence/entity/stretching.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StretchingRepository } from 'src/persistence/repository/stretching.repository';
import { StretchingEffectRepository } from 'src/persistence/repository/stretching-effect.repository';
import { StretchingImageRepository } from 'src/persistence/repository/stretching-image.repository';
import { StretchingPrecautionRepository } from 'src/persistence/repository/stretching-precaution.repository';
import { StretchingTechniqueRepository } from 'src/persistence/repository/stretching-technique.repository';

@Injectable()
export class StretchingService {
  constructor(
    @InjectRepository(StretchingRepository)
    private stretchingRepository: StretchingRepository,

    @InjectRepository(StretchingEffectRepository)
    private stretchingEffectRepository: StretchingEffectRepository,

    @InjectRepository(StretchingImageRepository)
    private stretchingImageRepository: StretchingImageRepository,

    @InjectRepository(StretchingPrecautionRepository)
    private stretchingPrecautionRepository: StretchingPrecautionRepository,

    @InjectRepository(StretchingTechniqueRepository)
    private stretchingTechniqueRepository: StretchingTechniqueRepository,
  ) {}

  // async getAllStretchings(): Promise<Stretching[]> {
  //   return await this.stretchingRepository.find();
  // }

  async createStretching(
    createStretchingRequest: CreateStretchingRequest,
  ): Promise<Stretching> {
    const newStretching = await this.stretchingRepository.createStretching({
      title: createStretchingRequest.title,
      mainCategory: createStretchingRequest.mainCategory,
      subCategory: createStretchingRequest.subCategory,
      collect: createStretchingRequest.collect,
      set: createStretchingRequest.set,
      adminId: null,
      videoUrl: createStretchingRequest.videoUrl,
    });

    console.log(
      createStretchingRequest.effectList,
      typeof createStretchingRequest.effectList,
    );

    createStretchingRequest.effectList.forEach((effect, i) => {
      this.stretchingEffectRepository.createStretchingEffect({
        stretchingId: newStretching.id,
        order: i + 1,
        effect,
      });
    });

    createStretchingRequest.imageList.forEach((url, i) => {
      this.stretchingImageRepository.createStretchingImage({
        stretchingId: newStretching.id,
        order: i + 1,
        url,
      });
    });

    createStretchingRequest.techniqueList.forEach((technique, i) => {
      this.stretchingTechniqueRepository.createStretchingTechnique({
        stretchingId: newStretching.id,
        order: i + 1,
        description: technique,
      });
    });

    createStretchingRequest.imageList.forEach((precaution, i) => {
      this.stretchingPrecautionRepository.createStretchingPrecaution({
        stretchingId: newStretching.id,
        order: i + 1,
        description: precaution,
      });
    });

    return newStretching;
  }

  // async getStretchingById(id: number): Promise<Stretching> {
  //   const found = await this.stretchingRepository.findOne({ where: { id } });

  //   if (!found) {
  //     throw new NotFoundException(`Can't find Stretching with id ${id}`);
  //   }

  //   return found;
  // }

  // async deleteStretching(id: number): Promise<void> {
  //   // remove: 없으면 에러 delete: 없어도 에러 X
  //   const result = await this.stretchingRepository.delete(id);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Can't find Stretching with id ${id}`);
  //   }
  // }

  // async updateStretchingStatus(
  //   id: number,
  //   status: StretchingStatus,
  // ): Promise<Stretching> {
  //   const stretching = await this.getStretchingById(id);

  //   stretching.status = status;
  //   await this.stretchingRepository.save(stretching);

  //   return stretching;
  // }
}
