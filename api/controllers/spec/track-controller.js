import {trackModel} from '../../models';
import {trackController} from '../track-controller';

const video = {
	play() {
		return true;
	},
};


describe(`The Track Controller`, () => {
    let mockData = JSON.stringify([{}, {}, {}]);
    let spyModel;
    let spyReq;
    let spyRes;

    beforeEach(() => {
	    const spy = jest.spyOn(video, 'play');
	    const isPlaying = video.play();

	    expect(spy).toHaveBeenCalled();
	    expect(isPlaying).toBe(true);
	    spyReq = jasmine.createSpyObject('req',  'id');
	    spy.mockReset();
	    console.log(spyReq);

	    spy.mockRestore();
	    /*spyReq = jest.spyOn('req',  [{params: 'id'}]);
        spyRes = jest.spyOn('res', ['json']);*/

    });


    describe(`getList method`, () => {
        it(`should call the model's getList method`, () => {
            spyOn(trackModel, 'getList').and.returnValue(Promise.resolve());

            trackController.getList(spyReq, spyRes);
            expect(trackModel.getList).toHaveBeenCalled();
        });

        describe(`on success cases`, () => {
            beforeEach(() => spyModel = spyOn(trackModel, 'getList')
                .and.returnValue(Promise.resolve(mockData)));

            it(`should respond with the model's data`, (done) => {
                trackController.getList(spyReq, spyRes).catch(done.fail)
                    .then(() => {
                        expect(spyRes.json).toHaveBeenCalled();
                        expect(spyRes.json).toHaveBeenCalledWith(mockData);
                    })
                    .then(done, done.fail);
            });
        });


        describe(`on error cases`, () => {
            let err = {error: new Error()};

            beforeEach(() => spyModel = spyOn(trackModel, 'getList')
                .and.returnValue(Promise.reject(err)));

            it(`should handle the model's reject`, (done) => {
                trackController.getList(spyReq, spyRes).catch(done.fail)
                    .then(() => {
                        expect(spyRes.json).toHaveBeenCalled();
                        expect(spyRes.json).toHaveBeenCalledWith({error: err.message});
                    })
                    .then(done, done.fail);
            });
        });
    });

});
