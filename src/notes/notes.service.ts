import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { Op } from 'sequelize';
import { DateRangeDto } from './dto/date-range.dto';
import { NoteIdDto } from './dto/note-id.dto';
import { EditNoteDto } from './dto/edit-note.dto';

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

  async getNoteById({ id }: NoteIdDto) {
    return await this.notesRepo.findOne({ where: { id, userId: this.userId } });
  }

  async deleteNoteById({ id }: NoteIdDto) {
    await this.notesRepo.destroy({ where: { id, userId: this.userId } });
  }

  async editNote(noteDto: EditNoteDto) {
    const [affectedRows] = await this.notesRepo.update(noteDto, {
      where: {
        id: noteDto.id
      }
    })
    return Boolean(affectedRows)
  }
}
