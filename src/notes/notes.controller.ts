import { Body, Controller, HttpCode, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { DateRangeDto } from './dto/date-range.dto';
import { GetNoteDto } from './dto/get-note.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Note } from './notes.model';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Создать заметку', operationId: 'createNote' })
  @ApiResponse({ status: 200, type: Note })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('create-note')
  async createNote(@Body() noteDto: CreateNoteDto) {
    return await this.notesService.createNote(noteDto);
  }

  @ApiOperation({ summary: 'Вывести заметки за указаный период', operationId: 'getNotesInDateRange' })
  @ApiResponse({ status: 200, type: [Note] })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-notes-in-date-range')
  async getNotesInDateRange(@Body() rangeDto: DateRangeDto) {
    return await this.notesService.getNotesInDateRange(rangeDto);
  }

  @ApiOperation({ summary: 'Вернуть заметку по ID', operationId: 'getNoteById' })
  @ApiResponse({ status: 200, type: Note })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-note-by-id')
  async getNoteById(@Body() noteDto: GetNoteDto) {
    const note = await this.notesService.getNoteById(noteDto);
    if (note === null) throw new NotFoundException('Заметки не существует')
    else return note
  }
}
