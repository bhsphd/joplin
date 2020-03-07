/* eslint-disable no-unused-vars */
require('app-module-path').addPath(`${__dirname}/..`);

const mockRequire = require('mock-require');

mockRequire('electron', {
	remote: {
		require: () => {
			return {
				bridge: () => {
					return {
						Menu: () => {},
					};
				},
			};
		},
	},
});

const { JSDOM } =require('jsdom');

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;

const { asyncTest, resourceService, decryptionWorker, encryptionService, loadEncryptionMasterKey, allSyncTargetItemsEncrypted, fileContentEqual, setupDatabase, setupDatabaseAndSynchronizer, db, synchronizer, fileApi, sleep, clearDatabase, switchClient, syncTargetId, objectsEqual, checkThrowAsync } = require('../../CliClient/tests/test-utils.js');

const React = require('react');
const { render, fireEvent, screen } = require('@testing-library/react');
const { NoteText2Component } = require('../gui/NoteText2.js');
const Setting = require('lib/models/Setting');
const Note = require('lib/models/Note');

describe('NoteText2', function() {

	beforeEach(async () => {
		await setupDatabaseAndSynchronizer(1);
		await switchClient(1);
	});

	it('should render correctly', async () => {
		const note1 = await Note.save({ title: 'my note', body: 'body of my note' });

		render(<NoteText2Component
			editor="Dummy"
			theme={Setting.THEME_LIGHT}
			noteId={note1.id}
			selectedNoteIds={[note1.id]}
			isProvisional={false}
			editorNoteStatuses={[]}
			syncStarted={false}
			watchedNoteFiles={[]}
		/>);
	});

});