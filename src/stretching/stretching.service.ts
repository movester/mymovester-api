import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStretchingRequest } from './request/create-stretching.request';
import { Stretching } from 'src/persistence/entity/stretching.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StretchingRepository } from 'src/persistence/repository/stretching.repository';
import { StretchingEffectRepository } from 'src/persistence/repository/stretching-effect.repository';
import { StretchingImageRepository } from 'src/persistence/repository/stretching-image.repository';
import { StretchingPrecautionRepository } from 'src/persistence/repository/stretching-precaution.repository';
import { StretchingTechniqueRepository } from 'src/persistence/repository/stretching-technique.repository';
import {
  IStretchingDetailDTO,
  StretchingDetailResponse,
} from './response/stretching-detail.response';
import { StretchingEffect } from 'src/persistence/entity/stretching-effect.entity';
import { StretchingImage } from 'src/persistence/entity/stretching-image.entity';
import { StretchingTechnique } from 'src/persistence/entity/stretching-technique.entity';
import { StretchingPrecaution } from 'src/persistence/entity/stretching-precaution.entity';
import {
  IStretchingListDTO,
  StretchingListResponse,
} from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';

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

  async getStretchingList(
    request: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    const [stretchings, total] =
      await this.stretchingRepository.findStretchingList(request);

    const stretchingList: IStretchingListDTO[] = await Promise.all(
      stretchings.map(async (stretching) => {
        const effectList: StretchingEffect[] =
          await this.stretchingEffectRepository.find({
            where: { stretchingId: stretching.id },
          });

        return {
          id: stretching.id,
          title: stretching.title,
          mainCategory: stretching.mainCategory,
          subCategory: stretching.subCategory,
          views: stretching.views,
          createdAt: stretching.createdAt,
          effectList: effectList.map(
            (stretchingEffect) => stretchingEffect.effect,
          ),
        };
      }),
    );
    return new StretchingListResponse(total, stretchingList);
  }

  // TODO: 트랜잭션
  async createStretching(
    request: CreateStretchingRequest,
  ): Promise<Stretching> {
    const newStretching = await this.stretchingRepository.createStretching({
      title: request.title,
      mainCategory: request.mainCategory,
      subCategory: request.subCategory,
      collect: request.collect,
      set: request.set,
      adminId: null,
      videoUrl: request.videoUrl,
    });

    request.effectList.forEach((effect, i) => {
      this.stretchingEffectRepository.createStretchingEffect({
        stretchingId: newStretching.id,
        order: i + 1,
        effect,
      });
    });

    request.imageList.forEach((url, i) => {
      this.stretchingImageRepository.createStretchingImage({
        stretchingId: newStretching.id,
        order: i + 1,
        url,
      });
    });

    request.techniqueList.forEach((technique, i) => {
      this.stretchingTechniqueRepository.createStretchingTechnique({
        stretchingId: newStretching.id,
        order: i + 1,
        description: technique,
      });
    });

    request.imageList.forEach((precaution, i) => {
      this.stretchingPrecautionRepository.createStretchingPrecaution({
        stretchingId: newStretching.id,
        order: i + 1,
        description: precaution,
      });
    });

    return newStretching;
  }

  async getStretchingById(id: number): Promise<StretchingDetailResponse> {
    const stretching: Stretching = await this.stretchingRepository.findOne({
      where: { id },
    });

    if (!stretching) {
      throw new NotFoundException(
        `해당 스트레칭이 존재하지 않습니다. id: ${id}`,
      );
    }

    const effectList: StretchingEffect[] =
      await this.stretchingEffectRepository.find({
        where: { stretchingId: id },
      });

    const imageList: StretchingImage[] =
      await this.stretchingImageRepository.find({
        where: { stretchingId: id },
      });

    const techniqueList: StretchingTechnique[] =
      await this.stretchingTechniqueRepository.find({
        where: { stretchingId: id },
      });

    const precautionList: StretchingPrecaution[] =
      await this.stretchingPrecautionRepository.find({
        where: { stretchingId: id },
      });

    const StretchingDetailResponseParam: IStretchingDetailDTO = {
      id: stretching.id,
      title: stretching.title,
      mainCategory: stretching.mainCategory,
      subCategory: stretching.subCategory,
      collect: stretching.collect,
      set: stretching.set,
      videoUrl: stretching.videoUrl,
      views: stretching.views,
      adminId: stretching.adminId,
      createdAt: stretching.createdAt,
      updatedAt: stretching.updatedAt,
      effectList: effectList.map((stretchingEffect) => stretchingEffect.effect),
      imageList: imageList.map((stretchingImage) => stretchingImage.url),
      techniqueList: techniqueList.map((technique) => technique.description),
      precautionList: precautionList.map(
        (precaution) => precaution.description,
      ),
    };

    return new StretchingDetailResponse(StretchingDetailResponseParam);
  }

  // TODO: 트랜잭션 추가
  async deleteStretching(id: number): Promise<void> {
    const result = await this.stretchingRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 스트레칭이 존재하지 않습니다. id: ${id}`,
      );
    }

    await this.stretchingEffectRepository.delete({ stretchingId: id });
    await this.stretchingImageRepository.delete({ stretchingId: id });
    await this.stretchingTechniqueRepository.delete({ stretchingId: id });
    await this.stretchingPrecautionRepository.delete({ stretchingId: id });
  }

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
