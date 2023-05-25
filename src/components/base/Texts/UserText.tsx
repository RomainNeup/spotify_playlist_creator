import React, { FormEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Icon from '../Icons/Icon';
import P from './P';
import Input from '../Inputs/Input';

export default function UserText({
  className,
  text,
  handleDelete,
  handleEdit,
  isEditable,
  username,
  color = 'primary',
}: UserTextProps): ReactElement {
  const { t } = useTranslation('post');
  const [editedText, setEditedText] = useState<string | null>(null);

  const handleEditUserText = (event: FormEvent) => {
    event.preventDefault();
    if (!editedText) return;
    handleEdit(editedText);
    setEditedText(null);
  };

  const classes = clsx(
    className,
    [
      'self-center',
      'w-100',
      'grow',
    ],
  );

  if (editedText !== null) {
    return (
      <div className={classes}>
        <form onSubmit={handleEditUserText} className="flex">
          <Input
            placeholder={t('comment.add')}
            border={false}
            onChange={(e) => setEditedText(e.target.value)}
            value={editedText}
            className="grow"
            color={color}
          />
          <Icon
            name="delete"
            onClick={handleDelete}
            color={color}
            className="text-sm mx-2"
          />
          <Icon
            name="close"
            color={color}
            onClick={() => setEditedText('')}
          />
        </form>
      </div>
    );
  }

  return (
    <div className={classes}>
      <span className="font-light mb-4">
        {
          isEditable && (
            <div className="float-right">
              <Icon
                onClick={() => setEditedText(text)}
                name="edit"
                color={color}
                className="mr-2 text-sm"
              />
            </div>
          )
        }
        <P color={color}>
          {username && (
            <b className="font-bold">
              {`${username} `}
            </b>
          )}
          {text}
        </P>
      </span>
    </div>
  );
}
