import { Body, Controller, HttpCode, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { DateRangeDto } from './dto/date-range.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Note } from './notes.model';
import { EditNoteDto } from './dto/edit-note.dto';
import { NoteViewDto } from './dto/note-view.dto';
import { IdDto } from 'src/shared/dto/id.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Создать заметку', operationId: 'createNote' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('create-note')
  async createNote(@Body() noteDto: CreateNoteDto, @Req() req) {
    this.notesService.setUserId(req.user.id)
    return await this.notesService.createNote(noteDto);
  }

  @ApiOperation({ summary: 'Вывести заметки за указаный период', operationId: 'getNotesInDateRange' })
  @ApiResponse({ status: 200, type: [Note] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('get-notes-in-date-range')
  async getNotesInDateRange(@Body() rangeDto: DateRangeDto, @Req() req) {
    this.notesService.setUserId(req.user.id)
    return await this.notesService.getNotesInDateRange(rangeDto);
  }

  @ApiOperation({ summary: 'Вернуть заметку по ID', operationId: 'view-note' })
  @ApiResponse({ status: 200, type: NoteViewDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('view-note')
  async getNoteById(@Body() noteDto: IdDto, @Req() req) {
    this.notesService.setUserId(req.user.id)
    const note = await this.notesService.viewNote(noteDto);
    if (note === null) throw new NotFoundException('Заметки не существует')
    else return note
  }

  @ApiOperation({ summary: 'Удалить заметку по ID', operationId: 'deleteNoteById' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('delete-note-by-id')
  async deleteNoteById(@Body() noteDto: IdDto, @Req() req) {
    this.notesService.setUserId(req.user.id)
    return this.notesService.deleteNoteById(noteDto)
  }

  @ApiOperation({ summary: 'Редактировать заметку', operationId: 'editNote' })
  @ApiResponse({ status: 200, type: Note })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('edit-note')
  async editNote(@Body() notedto: EditNoteDto, @Req() req) {
    this.notesService.setUserId(req.user.id)
    return this.notesService.editNote(notedto)
  }
}
