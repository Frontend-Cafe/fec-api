import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdEventSeat } from 'react-icons/md';
import { BsFillPeopleFill, BsBookHalf, BsGear } from 'react-icons/bs';
import { FaPeopleCarry } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { IoIosColorFilter } from 'react-icons/io';

const currentDateTime = new Date().toISOString();

const eventsTree = (S) =>
  S.listItem()
    .title('Eventos')
    .icon(MdEventSeat)
    .child(
      S.list()
        .title('Eventos')
        .items([
          S.listItem()
            .title('Eventos Proximos')
            .schemaType('event')
            .child(
              S.documentTypeList('event')
                .title('Eventos Proximos')
                .filter('_type == "event" && date >= $currentDateTime')
                .params({ currentDateTime }),
            ),
          S.listItem()
            .title('Eventos Anteriores')
            .icon(() => <MdEventSeat style={{ opacity: 0.66 }} />)
            .schemaType('event')
            .child(
              S.documentTypeList('event')
                .title('Eventos Anteriores')
                .filter('_type == "event" && date < $currentDateTime')
                .params({ currentDateTime }),
            ),

          S.listItem()
            .title('Categorias')
            .schemaType('category')
            .child(
              S.documentTypeList('category').title('Categorias de Eventos'),
            ),
          S.listItem()
            .title('Tags')
            .schemaType('tag')
            .child(S.documentTypeList('tag').title('Tags de Eventos')),
        ]),
    );

const initiativesTree = (S) =>
  S.listItem()
    .title('Iniciativas')
    .icon(FaPeopleCarry)
    .child(
      S.list()
        .title('Iniciativas')
        .items([
          S.listItem()
            .title('Mentorias')
            .icon(GiTeacher)
            .child(
              S.list()
                .title('Mentorias')
                .items([
                  S.listItem()
                    .title('Mentores')
                    .schemaType('mentor')
                    .child(S.documentTypeList('mentor').title('Mentores')),
                  S.listItem()
                    .title('Temas')
                    .schemaType('topic')
                    .child(S.documentTypeList('topic').title('Temas')),
                ]),
            ),
          S.listItem()
            .title('CMYK+')
            .icon(IoIosColorFilter)
            .child(
              S.list()
                .title('CMYK+')
                .items([
                  S.listItem()
                    .title('Proyectos')
                    .schemaType('cmyk')
                    .child(S.documentTypeList('cmyk').title('Proyectos')),
                  S.listItem()
                    .title('Participantes')
                    .schemaType('cmykParticipant')
                    .child(
                      S.documentTypeList('cmykParticipant').title(
                        'Participantes',
                      ),
                    ),
                ]),
            ),
          S.listItem()
            .title('Reactivistas')
            .schemaType('reactGroup')
            .child(
              S.documentTypeList('reactGroup').title('Grupos de Reactivistas'),
            ),
        ]),
    );

const contentTree = (S) =>
  S.listItem()
    .title('Contenido')
    .icon(BsBookHalf)
    .child(
      S.list()
        .title('Contenido')
        .items([
          S.listItem()
            .title('Documentos')
            .schemaType('docs')
            .child(S.documentTypeList('docs').title('Documentos')),
          S.listItem()
            .title('Posts')
            .schemaType('post')
            .child(S.documentTypeList('post').title('Posts')),
          S.listItem()
            .title('Featured cards')
            .schemaType('featuredCards')
            .child(S.documentTypeList('featuredCards').title('Cards')),
        ]),
    );

const settingsTree = (S) =>
  S.listItem()
    .title('Settings')
    .icon(BsGear)
    .child(S.document().schemaType('settings').documentId('settings'));

export default () =>
  S.list()
    .title('Vamo’ el FEC')
    .items([
      settingsTree(S),
      S.divider(),
      S.listItem()
        .title('Personas')
        .icon(BsFillPeopleFill)
        .schemaType('person')
        .child(S.documentTypeList('person').title('Personas')),
      eventsTree(S),
      initiativesTree(S),
      contentTree(S),
      // ...S.documentTypeListItems(),
    ]);
