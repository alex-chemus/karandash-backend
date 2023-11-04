import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { Op } from 'sequelize';
import { DateRangeDto } from './dto/date-range.dto';
import { GetNoteDto } from './dto/get-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private readonly notesRepo: typeof Note) {}

  private userId: number

  setUserId(userId: number) {
    this.userId = userId
  }

  async createNote(noteDto: CreateNoteDto) {
    return await this.notesRepo.create({ ...noteDto, userId: this.userId });
  }

  async getNotesInDateRange(rangeDto: DateRangeDto) {
    return await this.notesRepo.findAll({
      where: {
        date: {
          [Op.gte]: rangeDto.start,
          [Op.lte]: rangeDto.end,
        },
        userId: this.userId
      },
    });
  }

  async getNoteById({ id }: GetNoteDto) {
    return await this.notesRepo.findOne({ where: { id, userId: this.userId } });
  }
}
